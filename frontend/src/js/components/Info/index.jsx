import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LeadImage from '../../../images/backgrounds/variety-of-vegetables.jpg';
import StrawberryImage from '../../../images/backgrounds/strawberry.jpg';
import GreenhouseImage from '../../../images/backgrounds/greenhouse.jpg';
import LoginButton from '../User/LoginButton';

const useStyles = makeStyles((theme) => {
  const bigImage = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    backgroundAttachment: 'fixed',
  };

  return {
    leadImage: {
      minHeight: '90vh', // TODO this should respond to toolbar height better
      alignItems: 'flex-end',
      ...bigImage,
    },
    leadText: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: theme.spacing(1),
    },
    block: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    blockImage: {
      minHeight: '50vh',
      alignItems: 'center',
      ...bigImage,
    },
    header: {
      textAlign: 'center',
      marginTop: theme.spacing(4),
    },
  };
});

// Static page of info/help that displays before a user is logged in or when they hit the (?)
// Pretty much just the readme, but more userish
const Info = () => {
  const classes = useStyles();

  return (
    <div>
      <div style={{ backgroundImage: `url(${LeadImage})` }} className={classes.leadImage}>
        <Typography variant="h2" component="h2" className={classes.leadText}>
          It&apos;s time to grow some veggies!
          <br />
          <ExpandMoreIcon style={{ fontSize: '50px' }} />
        </Typography>
      </div>

      <Container fixed className={classes.block}>
        <Typography variant="subtitle1">
          We want to make it easier to grow more of your own food, even if
          you&apos;re just starting out. Experienced gardeners know what grows
          well in their soil and microclimate. We&apos;re making it easier to start
          out, as if you already knew what grows well in your garden!
        </Typography>
      </Container>

      <div style={{ backgroundImage: `url(${StrawberryImage})` }} className={classes.blockImage}>
        <Container fixed className={classes.block}>
          <Typography variant="h4" component="h3" className={classes.header}>
            How do we know what you should plant?
          </Typography>
          <Typography variant="subtitle1">
            <p>
              Based on data we&apos;ve collected from you and your neighbors, we will suggest
              plants that work well not only in your Agricultural Zone, but things that have
              grown well in your neighborhood. Hopefully this will make it easier to be
              successful in growing your own food!
            </p>
            <p>
              Until we gather enough data, most of the suggestions will only be based on the Zone
              your garden is in. Once we have more information about what people are having success
              growing near you, that information will be factored into the suggestions.
            </p>
            <p>
              Even in a small city, there are multiple microclimates and different soil compositions
              that will affect what you can grow. That means that you will probably have more
              success growing things that your neighbors have had success with.
            </p>
            <p>
              We also take into account
              {' '}
              <em>when</em>
              {' '}
              things were planted outside to try to predict what
              will give you the best yield. This is why it&apos;s important to log
              when you plant and when you harvest (and how much you harvest!).
            </p>
          </Typography>
        </Container>
      </div>

      <Container fixed className={classes.block}>
        <Typography variant="h4" component="h3" className={classes.header}>
          So my neighbors will see my data?
        </Typography>
        <Typography variant="subtitle1">
          <p>
            Not exactly. We only collect your location and anything you enter in the
            &ldquo;Journal&rdquo;. No one will ever see your location or your specific
            collection of plants. The data that we share is only shared in the aggregate form.
            It&apos;s less intrusive than when Google tracks your location and then tells people
            when a store tends to be busy based on everyone&apos;s location data.
          </p>
          <p>
            We realize that your data is the most useful to you as well, so as soon as we can
            we&apos;d like to add reporting to this app to let you know how your own garden
            is doing.
          </p>
        </Typography>
      </Container>

      <div style={{ backgroundImage: `url(${GreenhouseImage})` }} className={classes.blockImage}>
        <Container fixed className={classes.block}>
          <Typography variant="h4" component="h3" className={classes.header}>
            Okay, how do I start?
          </Typography>
          <Typography variant="subtitle1">
            <p>
              Click &ldquo;Log In&rdquo; in the upper right corner (or below!) and login via Google.
              Once you enter your location, you will start seeing suggestions of what
              to plant right now. When you plant things, you will log them in the
              &ldquo;Journal&rdquo;, helping us to help you and your neighbors!
            </p>
          </Typography>
          <div style={{ textAlign: 'center' }}>
            <LoginButton>
              <Button variant="contained" color="primary">
                Log In Now
              </Button>
            </LoginButton>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Info;
