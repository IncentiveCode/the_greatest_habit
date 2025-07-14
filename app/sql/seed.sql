-- profiles
INSERT INTO profiles (profile_id, email, phone, avatar, username, headline, status, created_at, updated_at)
VALUES
  ('14f68b63-414e-41de-8738-ae96f1104e37', 'user1@example.com', '010-1111-1111', NULL, 'user1', '최고의 습관을 만듭니다', 'active', now(), now()),
  ('11111111-1111-1111-1111-111111111111', 'user2@example.com', '010-2222-2222', NULL, 'user2', '습관왕', 'active', now(), now()),
  ('22222222-2222-2222-2222-222222222222', 'user3@example.com', NULL, NULL, 'user3', NULL, 'inactive', now(), now()),
  ('33333333-3333-3333-3333-333333333333', 'user4@example.com', '010-4444-4444', NULL, 'user4', '도전중', 'active', now(), now()),
  ('44444444-4444-4444-4444-444444444444', 'user5@example.com', NULL, NULL, 'user5', NULL, 'active', now(), now());

-- rewards
INSERT INTO rewards (reward_id, title, point, created_at)
VALUES
  (1, '첫 도전 보상', 100, now()),
  (2, '꾸준함 보상', 200, now()),
  (3, '성실함 보상', 300, now()),
  (4, '열정 보상', 400, now()),
  (5, '마스터 보상', 500, now());

-- goals
INSERT INTO goals (goal_id, title, description, start_date, end_date, owner_id, reward_id, message_frequency, created_at, updated_at)
VALUES
  (1, '아침 6시 기상', '매일 아침 6시에 일어나기', now(), now() + interval '30 days', '14f68b63-414e-41de-8738-ae96f1104e37', 1, 'once a day', now(), now()),
  (2, '매일 운동', '매일 30분 운동하기', now(), now() + interval '30 days', '11111111-1111-1111-1111-111111111111', 2, 'once a day', now(), now()),
  (3, '책 읽기', '일주일에 한 권 읽기', now(), now() + interval '60 days', '22222222-2222-2222-2222-222222222222', 3, 'once a week', now(), now()),
  (4, '물 2L 마시기', '매일 2L 물 마시기', now(), now() + interval '30 days', '33333333-3333-3333-3333-333333333333', 4, 'once a day', now(), now()),
  (5, '영어 공부', '매일 영어 단어 10개 외우기', now(), now() + interval '30 days', '44444444-4444-4444-4444-444444444444', 5, 'once a day', now(), now());

-- action_plans
INSERT INTO action_plans (plan_id, title, description, period, start_date, end_date, goal_id, created_at, completed_at)
VALUES
  (1, '6시 알람 맞추기', '알람을 맞추고 일어나기', 'day', now(), now() + interval '30 days', 1, now(), NULL),
  (2, '운동 계획 세우기', '운동 루틴 정하기', 'week', now(), now() + interval '30 days', 2, now(), NULL),
  (3, '책 선정', '읽을 책 고르기', 'month', now(), now() + interval '60 days', 3, now(), NULL),
  (4, '물병 준비', '물병 챙기기', 'day', now(), now() + interval '30 days', 4, now(), NULL),
  (5, '단어장 만들기', '영어 단어장 작성', 'day', now(), now() + interval '30 days', 5, now(), NULL);

-- notifications
INSERT INTO notifications (notification_id, source_id, goal_id, target_id, type, created_at)
VALUES
  (1, '14f68b63-414e-41de-8738-ae96f1104e37', 1, '11111111-1111-1111-1111-111111111111', 'message', now()),
  (2, '11111111-1111-1111-1111-111111111111', 2, '22222222-2222-2222-2222-222222222222', 'review', now()),
  (3, '22222222-2222-2222-2222-222222222222', 3, '33333333-3333-3333-3333-333333333333', 'reply', now()),
  (4, '33333333-3333-3333-3333-333333333333', 4, '44444444-4444-4444-4444-444444444444', 'mention', now()),
  (5, '44444444-4444-4444-4444-444444444444', 5, '14f68b63-414e-41de-8738-ae96f1104e37', 'message', now());

-- reward_history (composite PK, 1개 이상 row)
INSERT INTO reward_history (profile_id, reward_id)
VALUES
  ('14f68b63-414e-41de-8738-ae96f1104e37', 1),
  ('11111111-1111-1111-1111-111111111111', 2),
  ('22222222-2222-2222-2222-222222222222', 3),
  ('33333333-3333-3333-3333-333333333333', 4),
  ('44444444-4444-4444-4444-444444444444', 5);

-- about_content
INSERT INTO about_content (id, title, description, "order", created_at, updated_at)
VALUES
  (1, '서비스 소개', '이 서비스는 최고의 습관을 만들어줍니다.', 1, now(), now()),
  (2, '사용법', '간단하게 목표를 등록하고 관리하세요.', 2, now(), now()),
  (3, '혜택', '꾸준히 하면 보상이 주어집니다.', 3, now(), now()),
  (4, '커뮤니티', '함께 도전하는 사람들이 있습니다.', 4, now(), now()),
  (5, '문의', '문의사항은 support@example.com', 5, now(), now());

-- tutorials
INSERT INTO tutorials (id, title, description, "order", created_at, updated_at)
VALUES
  (1, '튜토리얼 1', '첫 번째 튜토리얼입니다.', 1, now(), now()),
  (2, '튜토리얼 2', '두 번째 튜토리얼입니다.', 2, now(), now()),
  (3, '튜토리얼 3', '세 번째 튜토리얼입니다.', 3, now(), now()),
  (4, '튜토리얼 4', '네 번째 튜토리얼입니다.', 4, now(), now()),
  (5, '튜토리얼 5', '다섯 번째 튜토리얼입니다.', 5, now(), now());

-- tutorial_content
INSERT INTO tutorial_content (id, item_id, images, descriptions, created_at, updated_at)
VALUES
  (1, 1, ARRAY['/img/1.png'], ARRAY['1단계 설명'], now(), now()),
  (2, 2, ARRAY['/img/2.png'], ARRAY['2단계 설명'], now(), now()),
  (3, 3, ARRAY['/img/3.png'], ARRAY['3단계 설명'], now(), now()),
  (4, 4, ARRAY['/img/4.png'], ARRAY['4단계 설명'], now(), now()),
  (5, 5, ARRAY['/img/5.png'], ARRAY['5단계 설명'], now(), now()); 