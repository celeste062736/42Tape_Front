import React, { useState, useEffect } from 'react';
import { RankLayout, TopBar } from '../components/Components'

export default function Rank() {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const resp = await fetch(`http://localhost:9999/users`, {cache : 'no-store'});
                const data = await resp.json();
                setUsers(data);
                console.log(data); // 데이터 로깅
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        }
        
        fetchData();
    }, []);
    
    let rank_info = {
        rank_1: {
            intra_id: "woosekim",
            intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
            rank: 1,
        },
        rank_2: {
            intra_id: "dfasf",
            intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
            rank: 2,
        },
        rank_3: {
            intra_id: "w12412",
            intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
            rank: 3,
        },
        rank_4: {
            intra_id: "5325im",
            intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
            rank: 4,
        },
        rank_5: {
            intra_id: "235235m",
            intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
            rank: 5,
        },
        rank_6: {
            intra_id: "2352351",
            intra_picture: "https://cdn.intra.42.fr/users/499046b6eb8be4e65a52a6d91fe8081c/woosekim.jpg", 
            rank: 6,
        }
    }
    
    return (
        <div id="root">
            <TopBar></TopBar>
            <RankLayout data={rank_info}></RankLayout>
        </div>
    );
}
