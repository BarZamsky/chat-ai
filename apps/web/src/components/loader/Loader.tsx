import { Typography } from "@repo/ui"

export const Loader = () => {
    return (
        <div className="flex flex-col grow justify-center items-center w-full h-screen">
            <div className="flex flex-col gap-5 items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-l-2 border-brand-primary"></div>
                <div className="flex flex-col gap-1 items-center">
                    <Typography size="xl" weight="medium">Loading...</Typography>
                    <Typography>Fetching data, it may take a while</Typography>
                </div>
            </div>
        </div>
    )
}