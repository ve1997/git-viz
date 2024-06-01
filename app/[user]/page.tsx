"use client";
import { useParams } from "next/navigation";
export default function UserPage() {
	const { user } = useParams();
	return (
		<div>
			<p>UserPage</p>
			<p>{user}</p>
		</div>
	);
}
