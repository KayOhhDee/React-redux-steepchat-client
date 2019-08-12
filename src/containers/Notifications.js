import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { readNotifications } from "../store/actions/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import {
  UncontrolledTooltip,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";



class Notifications extends Component {
  state = {
    isOpen: false
  };

  componentDidUpdate(prevProps) {
    if(prevProps.notifications) {
      let unreadNotifications = prevProps.notifications.filter(n => n.read === false).map(n => n._id);
      this.props.readNotifications(unreadNotifications);
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { notifications } = this.props;
    let bellIco;

    if (notifications && notifications.length > 0) {
      if (notifications.filter(n => n.read === false).length > 0) {
        bellIco = (
          <div>
            <FontAwesomeIcon id="notifications" icon={faBell} />
            <UncontrolledTooltip placement="top" target="notifications">
              Notifications
            </UncontrolledTooltip>
            <span className="counter">
              {notifications.filter(n => n.read === false).length}
            </span>
          </div>
        );
      } else {
        bellIco = (
          <div>
            <FontAwesomeIcon id="notifications" icon={faBell} />
            <UncontrolledTooltip placement="top" target="notifications">
              Notifications
            </UncontrolledTooltip>
          </div>
        );
      }
    } else {
      bellIco = (
        <div>
          <FontAwesomeIcon id="notifications" icon={faBell} />
          <UncontrolledTooltip placement="top" target="notifications">
            Notifications
          </UncontrolledTooltip>
        </div>
      );
    }

    let notificationsItems =
      notifications && notifications.length > 0 ? (
        notifications.map(n => {
          const type = n.type === "like" ? "liked" : "commented on";
          const time = <Moment fromNow>{n.createdAt}</Moment>;
          const icoColor = n.read ? "#a9a9a9" : "#8E54E9";
          const ico =
            n.type === "like" ? (
              <FontAwesomeIcon
                style={{ fontSize: "1.1em", color: icoColor }}
                icon={faHeart}
              />
            ) : (
              <FontAwesomeIcon
                style={{ fontSize: "1.1em", color: icoColor }}
                color={icoColor}
                icon={faComment}
              />
            );

          return (
            <DropdownItem key={n.createdAt} style={{ padding: "4px" }}>
              <Link
                style={{ fontSize: ".9em", color: icoColor, textDecoration: "none" }}
                to={`/users/${n.recipient}/message/${n.message}`}
              >
                {ico} {n.sender.username} {type} your post ({time})
              </Link>
            </DropdownItem>
          );
        })
      ) : (
        <DropdownItem disabled onClick={this.toggle}>
          You have no notifications
        </DropdownItem>
      );

    return (
      <div>
        <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
          <DropdownToggle id="notifications-dropdown">{bellIco}</DropdownToggle>
          <DropdownMenu
            modifiers={{
              setMaxHeight: {
                enabled: true,
                order: 890,
                fn: data => {
                  return {
                    ...data,
                    styles: {
                      ...data.styles,
                      overflow: "auto",
                      maxHeight: 400,
                      maxWidth: "auto",
                      left: "-850%",
                      padding: ".3rem .5rem .3rem .2rem"
                    }
                  };
                }
              }
            }}
          >
            {notificationsItems}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.currentUser.user.notifications
});

export default connect(
  mapStateToProps,
  { readNotifications }
)(Notifications);
