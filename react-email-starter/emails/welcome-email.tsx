import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  username? : string;
}

export const WelcomeEmail = ({ username }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>The greatest habit에 오신 것을 환영합니다!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={logo}>The greatest habit</Text>
          <Hr style={hr} />
          <Text style={paragraph}> 안녕하세요, <span style={point}>{username}님!</span></Text>
          <Text style={paragraph}> 
            저희 서비스에 가입해주셔서 감사합니다. <br/>
            지금부터 작은 습관이 큰 변화를 만드는 여정이 시작됩니다.
          </Text>
          <Text style={paragraph}> 
            <span style={boldParagraph}>오늘의 작은 선택이 내일의 큰 변화를 만듭니다.</span><br/>
            지금 바로 첫 습관을 만들어보세요.
          </Text>
          <Button style={button} href="https://www.thegreatesthabit.com/user">
            Dashboard 로 이동하기
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            ✧ 시작하는 것이 막막하신가요? <br/>챌린지에 참여하셔서 작지만 좋은 습관을 만들어보세요. <br/>{' '}
            <Link style={anchor} href="https://www.thegreatesthabit.com/challenges">
              챌린지로 시작하기
            </Link>{' '}
          </Text>
          <Text style={paragraph}>
            ✧ 도움이 필요하신가요? <br/>자주 묻는 질문들을 확인해보세요. <br/>{' '}
            <Link style={anchor} href="https://www.thegreatesthabit.com/faq">
              FAQ 보기
            </Link>{' '}
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            We create what inspires. We create incentive. <br/>
            – The greatest habit 팀 드림
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: '#36454F',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const logo = {
  fontWeight: 'bold',
  fontSize: '20px',
  color: 'white',
};

const point = {
  fontWeight: 'bold',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const container = {
  backgroundColor: 'transparent',
  margin: '0 auto',
  padding: '20px 0px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#008080',
  margin: '20px 0',
};

const paragraph = {
  color: 'white',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const boldParagraph = {
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '24px',
  textAlign: 'left' as const,
}

const anchor = {
  color: '#C0C0C0',
};

const button = {
  backgroundColor: '#008080',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '10px',
};

const footer = {
  color: 'white',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'right' as const,
};
