import { SignInButton, SignUpButton } from "@clerk/clerk-react"
import { Button, Card, Typography } from "@repo/ui"

export const CreateAccount = () => {
    return (
        <Card className="flex flex-col gap-4 max-w-[18rem]">
            <div className="flex flex-col gap-1">
                <Typography weight="semibold">Let's create an account</Typography>
                <Typography color="neutral-600">
                    Save your chat history, share chat, and personalize your experience.
                </Typography>
            </div>
            <div className="flex flex-col gap-1">
                <SignInButton mode="modal">
                    <Button className="w-full">Sign in</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                    <Button variant="link" className="w-full">Create account</Button>
                </SignUpButton>
            </div>
        </Card>
    )
}