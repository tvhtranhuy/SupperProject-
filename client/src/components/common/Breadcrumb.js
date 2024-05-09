import React, { memo } from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io'

// Sử dụng useBreadcrumbs để tính toán và trả về các breadcrumb dựa trên các route được xác định trước đó trong ứng dụng.
const Breadcrumb = ({ title, category }) => {
    const routes = [
        { path: "/:category", breadcrumb: category },
        { path: "/", breadcrumb: "Home" },
        { path: "/:category/:pid/:title", breadcrumb: title },
    ];
    const breadcrumb = useBreadcrumbs(routes)
    return (
        <div className='text-sm flex items-center gap-1'>
            {breadcrumb?.filter(el => !el.match.route === false).map(({ match, breadcrumb }, index, self) => (
                <Link className='flex gap-1 items-center hover:text-main' key={match.pathname} to={match.pathname}>
                    <span className='capitalize'>{breadcrumb}</span>
                    {index !== self.length - 1 && <IoIosArrowForward />}
                </Link>
            ))}
        </div>
    )
}

export default memo(Breadcrumb)