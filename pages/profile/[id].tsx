import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { GoVerified } from "react-icons/go";
import NoResult from "../../components/NoResult";
import VideoCard from "../../components/VideoCard";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile: NextPage<IProps> = ({ data }) => {
  const { user, userLikedVideos, userVideos } = data;
  const [activeLink, setActiveLink] = useState("videos");
  const [videosList, setVideosList] = useState<Video[]>([]);

  useEffect(() => {
    if (activeLink === "videos") {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [activeLink, userVideos, userLikedVideos]);

  const videos =
    activeLink === "videos" ? "border-b-2 border-black" : "text-gray-400";
  const liked =
    activeLink === "liked" ? "border-b-2 border-black" : "text-gray-400";

  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        <div className="w-16 h-16 md:w-32 md:h-32">
          <Image
            width={120}
            height={120}
            layout="responsive"
            className="rounded-full"
            src={user.image}
            alt="user-profile"
          />
        </div>

        <div className='flex flex-col justify-center'>
          <div className="text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase">
            <span>{user.userName.replace(/\s+/g, "")} </span>
            <GoVerified className="text-blue-400 md:text-xl text-md" />
          </div>
          <p className="text-sm font-medium"> {user.userName}</p>
        </div>
      </div>
      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer ${videos} mt-2`}
            onClick={() => setActiveLink("videos")}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer ${liked} mt-2`}
            onClick={() => setActiveLink("liked")}
          >
            Liked
          </p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResult
              icon={<MdOutlineVideocamOff />}
              text={`No ${
                activeLink === "videos" ? "Videos" : "Liked"
              } Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
