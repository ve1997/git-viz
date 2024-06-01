"use client";
import { useParams } from "next/navigation";
export default function UserPage() {
	const { orgs, repo } = useParams();
	return (
		<div>
			<h1>Orgs: {orgs}</h1>
			<h1>Repo: {repo}</h1>
		</div>
	);
}
