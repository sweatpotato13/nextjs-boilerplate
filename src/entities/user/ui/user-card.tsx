import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@shared/ui/primitives/avatar";
import { Badge } from "@shared/ui/primitives/badge";
import { Button } from "@shared/ui/primitives/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";

import { User } from "../model";

interface UserCardProps {
    user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <Card className="border-border/70 bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4 border-b border-border/60">
                <Avatar className="size-16">
                    {user.avatarUrl ? (
                        <AvatarImage
                            src={user.avatarUrl}
                            alt={`${user.fullName}'s avatar`}
                        />
                    ) : null}
                    <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="grid gap-1">
                    <CardTitle className="text-lg">{user.fullName}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        @{user.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Member since{" "}
                        {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                </div>
            </CardHeader>

            <CardContent className="grid gap-4 pt-6">
                {user.bio ? (
                    <p className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
                        {user.bio}
                    </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full" variant="secondary">
                        {user.role}
                    </Badge>
                    <Badge variant="outline" className="rounded-full">
                        Active profile
                    </Badge>
                </div>
            </CardContent>

            <CardFooter className="justify-end gap-2 border-t border-border/60">
                <Button variant="ghost" size="sm">
                    Edit profile
                </Button>
                <Button variant="secondary" size="sm">
                    Contact
                </Button>
            </CardFooter>
        </Card>
    );
};
