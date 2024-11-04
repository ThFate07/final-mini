// link to login page when button is clicked

import  Link from "next/link";

function LoginButton(props) {
  return (
    <div className="flex mx-auto content-end gap-5 ">

      <Link
        className="text-black bg-amber-200 hover:brightness-75 rounded-md py-2 px-3 transition-all"
        href={"/login"}
      >

        Login
      </Link>
      <Link
        className="text-black bg-amber-200 hover:brightness-75 rounded-md py-2 px-3 transition-all"
        href={"/signup"}
      >
        Signup
      </Link>
    </div>
  );
}

export default LoginButton;
