import Seo from "../components/Seo";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Results {
	list_name: string;
	display_name: string;
	list_name_encoded: string;
	oldest_published_date: string;
	newest_published_date: string;
	updated: string;
}

type Props = {
	results: Results;
};

export default function Home({ results }: Props) {
	const router = useRouter();
	const onClick = (name: string) => {
		router.push(
			{
				pathname: `/lists/${name}`,
				query: {
					name,
				},
			},
			`/lists/${name}`
		);
	};
	const [books, setBooks] = useState();
	useEffect(() => {
		(async () => {
			const { results } = await (
				await fetch(`https://books-api.nomadcoders.workers.dev/lists`)
			).json();
			setBooks(results);
		})();
	}, []);

	return (
		<div>
			<Seo title="Home" />
			{!books && <h4>Loading...</h4>}
			{books?.map((book) => (
				<div
					onClick={() => onClick(book.list_name_encoded)}
					key={book.list_name_encoded}>
					<Link
						legacyBehavior
						href={{
							pathname: `/lists/${book.list_name_encoded}`,
							query: {
								name: book.list_name_encoded,
							},
						}}
						as={`/lists/${book.list_name_encoded}`}>
						<a>
							<h4>{book.list_name}</h4>
						</a>
					</Link>
				</div>
			))}
		</div>
	);
}
