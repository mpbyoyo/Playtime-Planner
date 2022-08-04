import React, { useState } from "react";
import { stateContext } from "./App";

const GroupContextMenu = ({ value }) => {
  const {
    setContextMenu,
    drawer,
    setDrawer,
    contextMenuRef,
    contextGroup,
    setContextGroup,
    contextUser,
    setContextUser,
    group,
    setGroup,
    setGroups,
    setNewName,
  } = value;
  const { user } = React.useContext(stateContext);
  const [deleteToggle, setDeleteToggle] = useState(false);

  React.useEffect(() => {
    if (contextGroup) {
      setGroup(contextGroup);
    }
  }, []);

  const handleDelete = (e) => {
    if (contextGroup) {
      fetch(`/groups/${contextGroup.id}`, {
        method: "DELETE",
      }).then((r) => {
        if (r.ok) {
          setGroups((v) => v.filter((p) => p.id !== contextGroup.id));
          setGroup(null);
        } else {
          alert("Unknown Error");
        }
      });
    } else if (contextUser) {
      if (contextUser.id === user.id) {
      } else if (group.users.length === 2) {
      } else {
        fetch(`/groups/${group.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: contextUser.id,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((d) => {
              setGroups((v) =>
                v.map((p) => {
                  if (p.id === group.id) {
                    return d;
                  }
                  return p;
                })
              );
            });
          } else {
            alert("Unknown Error");
          }
        });
      }
    }
  };

  const handleUpdate = () => {
    if (contextGroup) {
    } else if (contextUser) {
    }
  };

  const handleText = () => {
    if (contextGroup) {
      return "Delete Group";
    } else if (contextUser) {
      return "Remove User";
    }
  };

  const handleEditText = () => {
    if (contextGroup) {
      return "Rename Group";
    } else if (contextUser) {
      return "Change User Color";
    }
  };

  return (
    <div className="GroupContextMenu" onContextMenu={(e) => e.preventDefault()}>
      <div
        className={`context-menu absolute w-[15rem] h-fit bg-neutral z-[500] rounded-md`}
        onClick={() =>
          deleteToggle &&
          (() => {
            setContextMenu(null);
            setContextGroup(false);
            setContextUser(false);
          })
        }
        onMouseOver={() => {
          if (drawer) {
            setDrawer(true);
          }
        }}
        ref={contextMenuRef}
      >
        <div className="options flex flex-col child:btn p-2 child:mb-1 child:border-gray-50 child:border-opacity-10">
          <div
            className="hover:btn-primary"
            onClick={() => {
              setContextMenu(null);
              setNewName(contextGroup.name);
            }}
          >
            {handleEditText()}
          </div>
          <div
            className={`${
              deleteToggle ? "hover:btn-accent" : "hover:btn-error"
            }`}
            onClick={(e) =>
              deleteToggle ? handleDelete(e) : setDeleteToggle((v) => !v)
            }
          >
            {deleteToggle ? "Are you sure?" : handleText()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupContextMenu;
