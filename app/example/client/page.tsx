import { GetExampleClientComponent } from "@/app/example/client/components/GetExampleClientComponent";
import { PostExampleClientComponent } from "@/app/example/client/components/PostExampleClientComponent";

export default function Example() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 p-4">
			<GetExampleClientComponent />
			<PostExampleClientComponent />
		</div>
	);
}
