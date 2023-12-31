"use client"
import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getBlogsData() {
	const res = await fetch(`https://the-agency-insider.vercel.app/api/posts`, { cache: "no-store"} );
	
	if (!res.ok) {
		return notFound();
	}
	return res.json();
}

// export const metadata = {
// 	title: 'Insiders Blogs',
// 	description:
// 		'Read the latest blogs from the insiders of the Big Tech Companies',
// };

const Blog = async () => {
	const blogs = await getBlogsData();
	return (
		<div className={styles.mainContainer}>
			{blogs.map((blog) => (
				<Link
					href={`/blog/${blog._id}`}
					className={styles.container}
					key={blog._id}>
					<div className={styles.imageContainer}>
						<Image
							src={blog.img}
							alt=''
							width={400}
							height={250}
							className={styles.image}
						/>
					</div>
					<div className={styles.content}>
						<h1 className={styles.title}>{blog.title}</h1>
						<p className={styles.desc}>{blog.desc}</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Blog;
