import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

export async function GET(req: NextRequest) {
	return NextResponse.json(JSON.parse(fs.readFileSync('./app/api/logs.json', 'utf8')));
}

export async function POST(req: NextRequest) {
	const body = await req.json();

	var prev: any = [];
	fs.readFile('./app/api/logs.json', 'utf8', (err, data) => {
		if (err) throw err;
		prev = JSON.parse(data);
	});

	fs.writeFile('./app/api/logs.json', JSON.stringify([...prev, ...body]), (err) => {
		if (err) return NextResponse.json({ err: err });
	});

	return NextResponse.json({ body });
}
