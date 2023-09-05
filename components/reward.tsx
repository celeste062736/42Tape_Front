import { Button } from "./button";
import { Copyright } from './Components';
import Image from "next/image";

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
            <div className="col">
                <div className="row">
                    <div className="col-xl-10 d-flex justify-content-center align-items-center">
                        <h1 id="reward_title">&#127873; 42 TAPE Reward List &#127873;</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-5 d-flex justify-content-center align-items-center">
                        <div className="reward_tile">
                            <h2 className="reward_rank">Rank 1 ~ 3 &#127829;</h2>
                            <p className="reward_item centered-container">도미노피자 : 슈퍼디럭스 L + 콜라 1.25L</p>
                            <div className="d-flex align-items-center justify-content-center">
                                <Image className="reward_img" src="/pizza.png" width={1000} height={1000} alt="pizza_img"></Image>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 d-flex justify-content-center align-items-center">
                        <div className="reward_tile">
                            <h2 className="reward_rank">15명 무작위 랜덤 추첨! &#x1F91E;</h2>
                            <p className="reward_item centered-container">컴포즈커피 : 아메리카노(Ice)</p>
                            <div className="d-flex align-items-center justify-content-center">
                                <Image className="reward_img" src="/coffee.png" width={1000} height={1000} alt="coffee_img"></Image>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-10 d-flex justify-content-center align-items-center">
                        <Copyright></Copyright>
                    </div>
                </div>
            </div>
        </div>
    );
}