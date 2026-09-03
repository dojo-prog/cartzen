import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoginBodySchema, type LoginBody } from "@cartzen/shared";
import { useLogin } from "../hooks/useLogin";
import ButtonLoading from "@/components/common/ButtonLoading";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(LoginBodySchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginBody) => {
    login(data);
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6")}>
      <Card className="h-[50vh] w-full max-w-4xl overflow-hidden p-0">
        <CardContent className="grid h-full p-0 md:grid-cols-2">
          {/* Login Form */}
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col items-center justify-center p-6 md:p-8"
          >
            <FieldGroup>
              {/* Header */}
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>

                <p className="text-balance text-muted-foreground">
                  Login to your Cartzen account
                </p>
              </div>

              {/* Email Field */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...form.register("email")}
                />

                <FieldError errors={[form.formState.errors.email]} />
              </Field>

              {/* Password Field */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>

                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...form.register("password")}
                />

                <FieldError errors={[form.formState.errors.password]} />
              </Field>

              {/* Login Button */}
              <Field>
                <Button type="submit">
                  <ButtonLoading btnTitle="Login" isLoading={isPending} />
                </Button>
              </Field>

              {/* Signup */}
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link to={"/auth/register"}>Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Image */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Cartzen"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
};

export default LoginForm;
