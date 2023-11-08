import { Injectable } from '@nestjs/common';
import { Between, EntityManager } from "typeorm";
import { todayEnd, todayStart } from "../../shared/utils/helpers";
import { ViewsEventEntity } from "../event/entities/views-event.entity";

@Injectable()
export class DashboardService {

    constructor(private readonly entityManager: EntityManager) {
    }

    async card(id: number) {

        const tView: number = await this.todaysViews(id)
        const mView: number = await this.monthlyViews(id)

        return { tView, mView }

    }

    async todaysViews(id: number) {

        try {

            const [data, count] = await ViewsEventEntity.findAndCount({
                where: {
                    createdAt: Between(todayStart, todayEnd),
                    event: {
                        user: {
                            id: 1
                        }
                    }
                }

            });

            return count

        } catch (e) {

            console.log(e);

        }

    }

    async monthlyViews(id: number) {

        try {

            const currentDate = new Date();
            const currentMonth = new Date(currentDate.getMonth() + 1);

            const [data, count] = await ViewsEventEntity.findAndCount({
                where: {
                    createdAt: Between(currentMonth, todayEnd),
                    event: {
                        user: {
                            id: 1
                        }
                    }
                }

            });

            return count

        } catch (e) {

            console.log(e);

        }

    }

    async dashboard(id: number) {

        try {

            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];

            const res = await ViewsEventEntity.query(`
                SELECT
                  EXTRACT(MONTH FROM views_event.created_at) AS month,
                  COUNT(*) AS count
                FROM views_event
                JOIN Events ON views_event.event_id = Events.id
                WHERE Events.created_at >= '${formattedDate}' AND Events.user_id = ${id}
                GROUP BY EXTRACT(MONTH FROM views_event.created_at)
                ORDER BY month ASC;
            `)

            return res
        
        } catch (e) {

            console.log(e);
        
        }

    }

}