import { UserStats } from "../model";

interface UserStatsCardProps {
    stats: UserStats;
}

export const UserStatsCard = ({ stats }: UserStatsCardProps) => {
    return (
        <div className="card bg-base-100 shadow-md mb-6">
            <div className="card-body">
                <h3 className="card-title">Activity Stats</h3>

                <div className="stats stats-vertical shadow">
                    <div className="stat">
                        <div className="stat-title">Tasks Completed</div>
                        <div className="stat-value text-primary">
                            {stats.tasksDone}
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Tasks Created</div>
                        <div className="stat-value text-secondary">
                            {stats.tasksCreated}
                        </div>
                    </div>
                </div>

                <div className="mt-4 text-sm opacity-50">
                    Last activity: {stats.lastActive.toLocaleString()}
                </div>
            </div>
        </div>
    );
};
