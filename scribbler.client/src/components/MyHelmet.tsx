import { Helmet } from 'react-helmet-async';

interface Props {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
};

function MyHelmet({ title, description, keywords, canonical }: Props) {
    return (
        <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            {canonical && <link rel="canonical" href={canonical} />}
        </Helmet>
    );
};

export default MyHelmet;
