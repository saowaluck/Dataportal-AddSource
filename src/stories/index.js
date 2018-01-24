import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import { storiesOf } from '@storybook/react'
import Header from './../components/Header'
import Navigation from './../components/Navigation'
import Avatar from  './../components/Avatar'
import InputTextFiled from './../components/InputTextFiled'
import SelectDropdown from './../components/SelectDropdown'
import { ButtonStantdard } from './../components/ButtonStantdard'
import DisplaySourceDetail from './../components/DisplaySourceDetail'
import ListAllSource from './../components/ListAllSource'
import { Text } from './../components/Text'
import avatarImage from './../assets/img/steve.jpg'
import './../components/css/main.css'


storiesOf('Header', module)
  .add('Default', () => <Header />)

storiesOf('Navigation', module)
  .add('Tabs', () => <Navigation tabs={['Tab1','Tab2']} />)

storiesOf('Avatar', module)
  .add('Tiny', () => <Avatar image={avatarImage} size='tiny' />)
  .add('Small', () => <Avatar image={avatarImage} size='small' />)

storiesOf('Form', module)
  .add('InputTextFiled', () => <InputTextFiled icon='write icon' name='title' placeholder='Title' />)
  .add('SelectDropdown', () => <SelectDropdown />)

storiesOf('Button', module)
  .add('Stantdard', () => <ButtonStantdard text='Submit'/>)

storiesOf('Text', module)
  .add('Heading', () => <Text header={'Title'} />)
  .add('Paragraph', () => <Text paragraph={'Type of source'} />)

storiesOf('List Source', ListAllSource)
  .add('List Source', () => <ListAllSource resource={
    [
      {
        'id': 0,
        'name': 'Track Reseller',
        'type': 'Superset Dashboard',
        'url': 'https://www.prontotools.io/'
      },
      {
        'id': 1,
        'name': 'How to use checkbox of semantic-ui',
        'type': 'Superset Chart',
        'url': 'https://semantic-ui.com/modules/checkbox.html'
      }
    ]
} />)

storiesOf('Display Source Detail', module)
  .add('DisplaySourceDetail', () => <DisplaySourceDetail name={'Track Reseller'} type={'Superset Dashboard'} url={'https://www.prontotools.io/'} />)

