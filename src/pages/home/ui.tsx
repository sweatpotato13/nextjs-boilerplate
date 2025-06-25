import { TodoList } from "@widgets/todo-list";

export const HomePage = () => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full max-w-xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-primary">
                    Todo App
                </h1>
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <TodoList />
                    </div>
                </div>
            </div>
        </main>
    );
};
