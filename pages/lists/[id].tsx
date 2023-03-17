import { BookLists, ListResults } from "@/api";
import Seo from "@/components/Seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
	[key: string]: any;
}

export default function Detail({ results }: BookLists) {
	const router = useRouter();
	const [bookdata, setBookdata] = useState([]);
	useEffect(() => {
		(async () => {
			const { results } = await (
				await fetch(
					`https://books-api.nomadcoders.workers.dev/list?name=${router.query.id}`
				)
			).json();
			setBookdata(results);
		})();
	}, []);
	console.log(bookdata);
	return (
		<div>
			<span>{router.query.name}</span>
			<Seo title="Best Seller List" />
			{!bookdata && <h4>Loading...</h4>}
			{bookdata?.map((data) => (
				<div key={data.books.rank}>
					<Image src={`data.book_image`} />
					<div>
						<h3>{data.title}</h3>
						<h4>{data.description}</h4>
						<h4>{data.amazon_product_url}</h4>
					</div>
				</div>
			))}
		</div>
	);
}
