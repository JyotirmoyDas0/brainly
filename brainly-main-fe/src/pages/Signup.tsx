import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRef } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: async ({ username, password }: any) => {
      const res = await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });
      return res.data;
    },

    onSuccess: () => {
      toast.success("You have signed up");
      navigate("/signin");
    },

    onError: () => {
      toast.error("Signup failed");
    },
  });

  function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    signupMutation.mutate({ username, password });
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded border min-w-48 pb-4 p-8">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />

        <div className="flex justify-center items-center pt-4">
          <Button
            onClick={signup}
            loading={signupMutation.isPending}
            variant="primary"
            text="Signup"
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
}
