import { Button } from "./button";

export function RewardLayout() {
    return (
        <div className="row" style={{margin: '0px'}}>
            <div className="col-2 d-none d-xl-block">
                <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
                    <Button name="vote"></Button>
                </div>
                <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
                    <Button name="rank"></Button>
                </div>
                <div className="row d-flex align-items-center justify-content-center" style={{height: '100px'}}>
                    <Button name="reward"></Button>
                </div>
            </div>
            <div className="col-xl-10 d-flex align-items-center justify-content-center">
                <div className="row-10">
                    <h1 id="reward_title">&#127873; 42 TAPE Reward List &#127873;</h1>
                    <div className="reward_tile">
                        <h2 className="reward_rank">1 ~ 3위</h2>
                        <p className="centered-container">TEXT TEST</p>
                        <div className="d-flex align-items-center justify-content-center">
                            <img className="reward_img" src="/pizza.png" alt="pizza_img"></img>
                        </div>
                    </div>
                    <div className="reward_tile">
                        <h2 className="reward_rank">무작위 랜덤 추첨! &#x1F91E;</h2>
                        <p className="centered-container">TEXT TEST</p>
                        <div className="d-flex align-items-center justify-content-center">
                            <img className="reward_img" src="/coffee.png" alt="coffee_img"></img>
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    );
}