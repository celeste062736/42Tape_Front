import { TopBar } from "../components/topbar";
import { VoteLayout } from '../components/vote'

export interface TapeUser {
    user_id: number;
    number_votes: number;
    need_vote: boolean;
    number_notifications: number;
    need_notify: boolean;
    candidate_for_reward: boolean;
    is_activated: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface VoteListInfo {
    vote_id: number;
    project_name: string;
    season_id: number;
    filled_at: string;
}
  
export interface VoteInfo_DB {
    tape_user: TapeUser;
    voteList: VoteListInfo[];
}

export default function Vote() {
    // from backend API_DOC example data
    const data = {
        tape_user: {
            user_id: 141372,
            number_votes: 0,
            need_vote: false,
            number_notifications: 0,
            need_notify: false,
            candidate_for_reward: false,
            is_activated: false,
            createdAt: "2023-08-24T10:20:01.000Z",
            updatedAt: "2023-08-24T10:20:01.000Z"
        },
        voteList: [
            {
                vote_id: 20945,
                project_name: "CPP Module 04 #2",
                season_id: 1,
                filled_at: "2023-08-06T04:25:06.000Z"
            },
            {
                vote_id: 19837,
                project_name: "CPP Module 04 #1",
                season_id: 1,
                filled_at: "2023-08-06T01:51:16.000Z"
            },
            {
                vote_id: 19844,
                project_name: "get_next_line #2",
                season_id: 1,
                filled_at: "2023-04-06T09:39:36.000Z"
            },
            {
                vote_id: 19841,
                project_name: "Born2beroot",
                season_id: 1,
                filled_at: "2023-04-06T02:45:13.000Z"
            },
            {
                vote_id: 19842,
                project_name: "ft_printf",
                season_id: 1,
                filled_at: "2023-03-29T08:32:28.000Z"
            },
            {
                vote_id: 19843,
                project_name: "get_next_line #1",
                season_id: 1,
                filled_at: "2023-03-29T00:52:16.000Z"
            },
            {
                vote_id: 19840,
                project_name: "Libft",
                season_id: 1,
                filled_at: "2023-03-21T05:05:51.000Z"
            }
        ]
    };
    return (
        <div id="root">
            <TopBar></TopBar>
            <VoteLayout vote_data={data.voteList}></VoteLayout>
        </div>
    );
}