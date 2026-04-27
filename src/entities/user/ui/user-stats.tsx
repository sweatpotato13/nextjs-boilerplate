import { Badge } from "@shared/ui/primitives/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@shared/ui/primitives/card";
import { Progress } from "@shared/ui/primitives/progress";

import { UserStats } from "../model";

interface UserStatsCardProps {
    stats: UserStats;
}

export const UserStatsCard = ({ stats }: UserStatsCardProps) => {
    const completionRate = stats.tasksCreated
        ? Math.round((stats.tasksDone / stats.tasksCreated) * 100)
        : 0;

    return (
        <Card className="border-border/70 bg-card shadow-sm">
            <CardHeader className="border-b border-border/60">
                <CardTitle className="text-base">Activity stats</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4 pt-6">
                <div className="grid gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-sm text-muted-foreground">
                            Tasks completed
                        </span>
                        <Badge variant="secondary" className="rounded-full">
                            {stats.tasksDone}
                        </Badge>
                    </div>
                    <Progress value={completionRate} />
                </div>

                <div className="grid gap-3 rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-sm text-muted-foreground">
                            Tasks created
                        </span>
                        <Badge variant="outline" className="rounded-full">
                            {stats.tasksCreated}
                        </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Last activity {stats.lastActive.toLocaleString()}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
