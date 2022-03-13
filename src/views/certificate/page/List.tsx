import { Oval } from "react-loader-spinner"
import ReactPaginate from 'react-paginate'
import { useLocation, useNavigate } from "react-router-dom"

import { Certificates } from "components/Certificates"
import { useCertificateList } from "helpers/hooks/useCertificateList"
import { routeName, certificatesCrumbs } from "helpers/utils"
import { useFilter } from 'helpers/hooks'
import styles from "./List.module.scss"
import { Breadcrumb } from "components/Breadcrumb"
import { Tabs } from "components/Tabs"
import { ReactComponent as Right } from './right.svg'
import { ReactComponent as Left } from './left.svg'

const router = routeName("api.certificates.all")

const Certificate: React.FC = () => {
  const navigate = useNavigate()
  const { search } = useLocation()

  const cachePage = decodeURI(search)
  const { certificates, isLoading, meta: { last_page } } = useCertificateList(router + cachePage)
  const { tags, active: activeTag, page } = useFilter(routeName("api.tags.all"))

  const handlePageClick = (event?: any ) => {
    const { nextSelectedPage } = event
    if(nextSelectedPage === undefined) return
    const searchConditions = nextSelectedPage !== 0 ? 
      activeTag ? `?tag_normalized=${activeTag}&page=${nextSelectedPage + 1}` : `?page=${nextSelectedPage + 1}` : ""
    navigate({
      pathname: "/certificate",
      search: searchConditions
    })
  }

  return (
    <section className={styles.certificate}>
      <div className="container">
        <Breadcrumb crumbs={certificatesCrumbs} />
        <h2 className={styles.certificate__title + " title"}>Сертификаты магазинов</h2>

        <Tabs tabs={tags} name="tag" active={activeTag} />
        
        {isLoading ? (
          <div className={styles.certificate__spin}>
            <Oval
              color="#98092D"
              height={50}
              width={50}
              secondaryColor="#E0B5C0"
            />
          </div>
        ) : (
          <Certificates
            className="certificate-more"
            data={certificates}
            carousel={false}
          />
        )}

        { last_page > 1 ?
          <ReactPaginate
            initialPage={!page ? 0 : +page - 1}
            previousLabel={<Right />}
            nextLabel={<Left />}
            breakLabel={"..."}
            onClick={handlePageClick}
            breakClassName={"break-me"}
            pageRangeDisplayed={4}
            pageCount={last_page}
            marginPagesDisplayed={1}
            containerClassName="pagination"
            activeClassName="active" /> : null
          }        
      </div>
    </section>
  )
}

export default Certificate
