"use client";
import { MemberPage } from "@/features/member";
import { useParams } from "next/navigation";
export default function UserPage() {
	const { user } = useParams();
	return <MemberPage user={user as string} />;
}
