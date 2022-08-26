import {Transactions} from './models/transactions.model'
import {User} from './models/users.model'

function getDebitTransactions(date,userId){
	// Get all debit transaction of specific user
	let transactions = await Transactions.find({sender_id:userId,transaction_type:'debit'})
	let result=[]
	transactions.foreach((element)=>{
		//comparing date, we are only comparing date here not the time.
		if(element.created_at === date){

			//if date matches, find the person whoes the amount was debited to
			//We can also store the find user into hashmap, so we wont need to run the search query again, if user is same
			let user = await User.findOne({user_id:element.receiver_id})

			result.append({
				amount:element.amount,
				account_no:user.bank_account_no,
				receiver_name:user.username,
				date:element.created_at
			})

		}
	})

	return result;

}