import { db } from "../database/database.connection.js";

export async function findUserDB(id) {
    return await db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
}

export async function userPostsIdDB(id) {
    return await db.query(`SELECT * FROM posts WHERE "userId" = $1 LIMIT 6;`, [id]);
}

export async function userProfileIdDB(id) {
    return await db.query(`
        SELECT p."userName", p.picture, p.biography, u.name FROM profile p
        JOIN users u ON u.id = p."userId" WHERE p."userId"= $1;`, [id]
    );
}

export async function usersProfilesDB(id){
    const usersProfiles = await db.query(`
        SELECT p."userName", p."userId", p."picture" FROM profile p;`
    );
    const primaryUser = [];
    const profiles = usersProfiles.rows.map(u=>{
        if(u.userId!=id){
            return {
                userName: u.userName,
                userId: u.userId,
                picture: `data:image/jpeg;base64,${u.picture.toString('base64')}`,
            }
        }else{
            primaryUser.push({id: u.userId, picture: `data:image/jpeg;base64,${u.picture.toString('base64')}`, userName: u.userName})
        }
    });

    return {profiles, primaryUser};
}

