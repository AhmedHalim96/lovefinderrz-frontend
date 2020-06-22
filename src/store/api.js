import { createAction } from "@reduxjs/toolkit";

export const apiRequestStarted = createAction("api/RequestStarted");
export const apiRequestFailed = createAction("api/RequestFailed");
export const apiRequestSuccess = createAction("api/RequestSuccess");
