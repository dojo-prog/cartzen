import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/useLogin";
import { LoginBodySchema, type LoginBody } from "@cartzen/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ButtonLoading from "@/components/common/ButtonLoading";

const AdminLoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  const navigate = useNavigate();

  const form = useForm<LoginBody>({
    resolver: zodResolver(LoginBodySchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginBody) => {
    login(data, {
      onSuccess: (admin) => {
        navigate("/admin");

        toast.success(`Welcome back admin ${admin.username}!`);
      },
    });
  };

  return (
    <div className={cn("w-full flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@cartzen.com"
                  {...form.register("email")}
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...form.register("password")}
                />
              </Field>
              <Field>
                <Button type="submit">
                  <ButtonLoading btnTitle="Login" isLoading={isPending} />
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginForm;
