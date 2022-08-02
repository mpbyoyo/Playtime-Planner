import React, { useState } from "react";

const Chat = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="Chat">
      <div
        className={`bg-neutral border-x-2 border-accent absolute w-[20%] h-[60%] transition-all ${
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
        </div>
      </div>
    </div>
  );
};

export default Chat;
