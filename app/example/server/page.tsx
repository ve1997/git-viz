import { GetExampleServerComponent } from "@/app/example/server/components/GetExampleServerComponent";
import { PostExampleServerComponent } from "@/app/example/server/components/PostExampleServerComponent";

export default function Example() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 p-4">
			<GetExampleServerComponent />
			<PostExampleServerComponent />
		</div>
	);
}
