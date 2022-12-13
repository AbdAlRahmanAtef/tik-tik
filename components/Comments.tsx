import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { BiCommentX } from "react-icons/bi";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import NoResult from "./NoResult";

interface IProps {
  addComment: (e: React.FormEvent) => void;
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments: NextPage<IProps> = ({
  addComment,
  isPostingComment,
  comment,
  setComment,
  comments,
}: IProps) => {
  const { userProfile, allUsers }: any = useAuthStore();

  return (
    <div className="border-t-2 border-b-2  border-gray-200 pt-4 px-10 bg-[#f8f8f8] lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length > 0 ? (
          comments?.map((item: IComment, index: number) => (
            <>
              {allUsers?.map(
                (user: IUser) =>
                  user._id === (item.postedBy._ref || item.postedBy._id) && (
                    <div className=" p-2 items-center" key={index}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12">
                            <Image
                              width={48}
                              height={48}
                              className="rounded-full cursor-pointer"
                              src={user.image}
                              alt="user-profile"
                              layout="responsive"
                            />
                          </div>

                          <p className="flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary">
                            {user.userName}{" "}
                            <GoVerified className="text-blue-400" />
                          </p>
                        </div>
                      </Link>
                      <div>
                        <p className="-mt-5 ml-16 text-[16px] mr-8">
                          {item.comment}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResult text="No comments yet!" icon={<BiCommentX />} />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form className="flex gap-4 w-full" onSubmit={addComment}>
            <input
              type="text"
              value={comment}
              placeholder="Add Comment..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 border-gray-100 w-[250px] md:w-[650px] lg:w-[280px] focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg transition:.3s "
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={addComment}
              className=" text-white bg-[#F51997] w-[120px] font-semibold rounded-lg"
            >
              {isPostingComment ? "Commenting" : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
