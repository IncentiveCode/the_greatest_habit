CREATE OR REPLACE VIEW challenge_list_view AS
SELECT
  goals.title, 
	goals.description, 
	goals.start_date, 
	goals.end_date, 
	goals.message_frequency, 
	goals.goal_status,
  rewards.title as reward, 
	rewards.point as point,
	goals.goal_id,
	count(challenge_members.profile_id) as count
FROM 
  goals 
INNER JOIN 
	rewards USING (reward_id)
LEFT JOIN 
	challenge_members USING (goal_id)
WHERE
  goal_type='challenge' and goal_status='Started'
group by 
	goals.title, goals.description, goals.start_date, goals.end_date, goals.message_frequency, goals.goal_status, goal_id,
	reward, point