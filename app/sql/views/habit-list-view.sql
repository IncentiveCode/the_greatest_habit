CREATE OR REPLACE VIEW habit_list_view AS
SELECT
  goals.title, 
	goals.description, 
	goals.start_date, 
	goals.end_date, 
	goals.message_frequency, 
	goals.goal_status,
  rewards.title as reward, 
	rewards.point as point,
	goals.goal_id
FROM 
  goals 
INNER JOIN 
	rewards USING (reward_id)
WHERE
  goal_type='habit' 
group by 
	goals.title, goals.description, goals.start_date, goals.end_date, goals.message_frequency, goals.goal_status, goal_id,
	reward, point
ORDER BY 
  end_date desc