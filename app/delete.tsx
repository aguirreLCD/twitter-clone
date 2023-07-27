"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Delete({ tweet }: { tweet: TweetWithAuthor }) {
  const router = useRouter();

  const handleDelete = async () => {
    const supabase = createClientComponentClient<Database>();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from("tweets").delete().eq("id", tweet.id);
    }

    
    router.refresh();
  };

  return <button onClick={handleDelete}>Delete</button>;
}
