import React from 'react';
import Link from 'next/link';

const errorPage = (props) => {
    return (
        <div>
            <h4>Oops something went wrong!</h4>
            <p>Try <Link href="/"><a>go back</a></Link></p>
        </div>
    );

}

export default errorPage;