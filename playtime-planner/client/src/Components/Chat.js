import React, { useState } from "react";

const Chat = () => {
  const [toggle, setToggle] = useState(false);
  const [closed, setClosed] = useState(false);
  return (
    <div className="Chat">
      <div
        className={` border-x-2 border-accent absolute w-[20%] max-w-[20rem] h-[60%] transition-all ${
          !toggle ? "-bottom-[53.9%]" : "bottom-0"
        }  right-0 rounded-t-sm`}
      >
        <div
          className="bg-accent w-full h-[10%] absolute text-accent-content font-semibold select-none cursor-pointer text-[100%] rounded-t-sm"
          onClick={() => setToggle((v) => !v)}
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-[5%]">
            Messages
          </div>
          {/* <div className="btn btn-circle absolute right-1 btn-outline top-[23%] min-h-0 w-8 h-8">
            <p className="text-lg">X</p>
          </div> */}
        </div>
        <div className="h-[90%] w-full absolute top-[10%] bg-neutral flex flex-col"></div>
      </div>
    </div>
  );
};

export default Chat;
