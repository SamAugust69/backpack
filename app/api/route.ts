import { NextResponse } from 'next/server';

const test = localStorage.getItem('local-data');

const GET = async () => {
	NextResponse.json({
		test,
	});
};
