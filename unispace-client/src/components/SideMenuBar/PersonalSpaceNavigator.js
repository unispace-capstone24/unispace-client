import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { MdOutlineAddBox } from "react-icons/md";
import axios from 'axios';

import {
  NestedAccordionBody,
  NestedAccordionItem,
  CustomH5,
  EndPointCustomH5,
} from "./SideMenuBar";
import { userInfoState } from "../../contexts/UserInfoState";

function PersonalSpaceNavigator(props) {
  const navigate = useNavigate();
  const params = useParams();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [pageListInfo, setPageListInfo] = useState();

  useEffect(() => {
    const fetchPersonalSpace = async () => {
      const response = await axios.get(`/member/${props.userId}/space`);
      const pageList = response.data.data;
      setPageListInfo(pageList);
    };

    fetchPersonalSpace();
  }, [props.userId]);

  const addNewPage = async () => {
    const userInfoFetchRes = await axios.get(`/member/${userInfo.id}/space`);
    const spaceId = userInfoFetchRes.data.data.spaceId;

    const addPageRes = await axios.post(`/space/${spaceId}/page`, {
      title: "새로운 페이지",
    });

    navigate(`/space/${addPageRes.data.data.pageId}`);
  };

  return (
    <>
      <Accordion.Item eventKey="0">
        <Accordion alwaysOpen flush>
          <Accordion.Header>
            <CustomH5>작업공간</CustomH5>
          </Accordion.Header>
          <NestedAccordionBody>
            {pageListInfo?.pageList.map((page) => {
              if (page.parentId === null) {
                return (
                  <EndPointCustomH5
                    $active={params.pageId === page.pageId.toString()}
                    key={page.pageId}
                    className="page-item"
                    onClick={() => {
                      setUserInfo({
                        ...userInfo,
                        inPersonal: true,
                        activeTeamId: null,
                      });
                      navigate(`/space/${page.pageId}`);
                    }}
                  >
                    {page.title}
                  </EndPointCustomH5>
                );
              }
              return null; // parentId가 null이 아닐 경우 null을 반환
            })}
            <EndPointCustomH5 $active={false} onClick={addNewPage}>
              <MdOutlineAddBox /> Add Page
            </EndPointCustomH5>
          </NestedAccordionBody>
        </Accordion>
      </Accordion.Item>
      <NestedAccordionItem eventKey="1">
        <EndPointCustomH5
          $active={false}
          onClick={() => {
            setUserInfo({ ...userInfo, inPersonal: true, activeTeamId: null });
            navigate(`/schedule/${pageListInfo?.spaceId}`);
          }}
        >
          스케줄
        </EndPointCustomH5>
      </NestedAccordionItem>
    </>
  );
}

export default PersonalSpaceNavigator;