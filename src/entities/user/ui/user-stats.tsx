import { UserStats } from "../model";

interface UserStatsCardProps {
    stats: UserStats;
}

export const UserStatsCard = ({ stats }: UserStatsCardProps) => {
    return (
        <div className="card bg-base-200 border border-primary/30">
            <div className="card-body">
                <h3 className="text-primary text-sm mb-4">
                    <span className="text-secondary">&gt;</span> ACTIVITY_STATS:
                </h3>

                <div className="stats stats-vertical bg-base-300 shadow">
                    <div className="stat">
                        <div className="stat-title text-primary/60">
                            Tasks Completed
                        </div>
                        <div className="stat-value text-success">
                            {stats.tasksDone}
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-title text-primary/60">
                            Tasks Created
                        </div>
                        <div className="stat-value text-warning">
                            {stats.tasksCreated}
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-primary/20 text-xs text-primary/40">
                    <span className="text-secondary">&gt;</span> Last activity:{" "}
                    {stats.lastActive.toLocaleString()}
                </div>
            </div>
        </div>
    );
};
