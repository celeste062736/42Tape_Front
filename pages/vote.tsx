import { TopBar } from "../components/topbar";

export default function Vote() {
    var _length = 3;    // 4위부터 표시할 랭크 Row 개수
    return (
        <div id="root">
            <TopBar></TopBar>
            {/* <VoteLayout></VoteLayout> */}
        </div>
    );
}