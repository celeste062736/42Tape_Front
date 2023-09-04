import { LogoImg2 } from './logo';

export function Welcome() {
    return (
        <div id="welcome_popup">
            <p>
                <LogoImg2></LogoImg2>
                <span style={{ color: '#6181FF', fontWeight: 'bold'}}>42TAPE</span>에 오신 것을 환영합니다!
                <br></br>
                <br></br>
                은하수를 여행하면서 기억에 남는 최고의 평가자에게 투표하세요!
                <br></br>
                <br></br>
                <span>
                    투표에 참여하면 2주마다 추첨하는 보상에 자동 응모됩니다.
                </span>
            </p>
        </div>
    );
}
