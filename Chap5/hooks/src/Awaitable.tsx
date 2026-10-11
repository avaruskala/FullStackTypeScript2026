import { Suspense } from "react";
import type { UserType } from "./Home";
import Fetcher from "./Fetcher";


interface AwaitableProps {
  fetchPromise?: Promise<UserType[]>;
}

export default function Awaitable({ fetchPromise }: AwaitableProps) {
  return (
    <Suspense fallback={<div>Loading users ...</div>}>
      {fetchPromise ? <Fetcher fetchPromise={fetchPromise} /> : null}
    </Suspense>
  )
}
