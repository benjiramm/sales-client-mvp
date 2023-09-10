import { ESocketClients } from "@/middleware/types/socket.types";
import { ESocketActions } from "@/slices/actions";
import { useAppDispatch } from "../store/hooks";
import { type } from "os";
import React, { memo, useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const SocketProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isFirstRender = useRef(false);
  // if user auth -> connect socket
  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    isFirstRender.current = true;
    dispatch({
      type: ESocketActions.CONNECT,
      payload: {
        url: `${process.env.API}`,
        clientName: ESocketClients.MAIN,
      },
    });
  }, []);
  return <>{children}</>;
};

export default memo(SocketProvider);
