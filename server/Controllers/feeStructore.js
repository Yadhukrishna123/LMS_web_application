const feeStructoreModal = require("../modals/feeStructore")


exports.createFeeSteuctore = async (req, res) => {
    try {
        const { name, batch, year, totalFee, feeBreakDown, installment } = req.body;

        if (!name || !batch || !year || !totalFee || !installment) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const feeStructore = await feeStructoreModal.create({
            name,
            batch,
            year,
            totalFee,
            feeBreakDown,
            installment
        })

        if (!feeStructore) {
            return res.status(404).json({
                success: false,
                mesage: "Fee structure creating faild"
            })
        }

        res.status(200).json({
            success: true,
            message: "Fee structure created successfully",
            feeStructore
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getAllFeeStructore = async (req, res) => {
    try {
        const { name } = req.query

        let query = {}
        if (name) {
            query.name = { $regex: name, $options: "i" }
        }
        const feeStructore = await feeStructoreModal.find(query)

        if (!feeStructore) {
            return res.status(400).json({
                success: false,
                message: "fee structore not founf"
            })
        }

        res.status(200).json({
            success: true,
            feeStructore,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getFeeStructore = async (req, res) => {
    const { id } = req.params
    try {
        const fiiStructore = await feeStructoreModal.findById(id)

        if (!fiiStructore) {
            return res.status(400).json({
                success: false,
                message: "fee structore not founf"
            })
        }

        res.status(200).json({
            success: true,
            fiiStructore,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteFeestructore = async (req, res) => {
    const { id } = req.params
    try {
        const deleteStructore = await feeStructoreModal.findByIdAndDelete(id)

        if (!deleteStructore) {
            return res.status(400).json({
                success: false,
                message: "fee structore not founf"
            })
        }

        res.status(200).json({
            success: true,
            message: "Fee structore successfully deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
