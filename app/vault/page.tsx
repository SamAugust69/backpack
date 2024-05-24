'use client';
import { useState } from 'react';
import InOut from '../components/ui/InOut';

export default function Vault() {
	const [pageLoaded, setPageLoaded] = useState(false);

	return pageLoaded ? <InOut width={1000}></InOut> : null;
}
